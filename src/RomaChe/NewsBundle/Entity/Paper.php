<?php

namespace RomaChe\NewsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use RomaChe\AuthBundle\Helpers\ChmodInterface;

/**
 * Paper
 *
 * @ORM\Table(name="paper")
 * @ORM\Entity(repositoryClass="RomaChe\NewsBundle\Repository\PaperRepository")
 */
class Paper implements ChmodInterface
{
    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->type = 'PAPER';
    }
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=500, nullable=true)
     */
    private $description;

    /**
     * One Product has One Shipment.
     * @ORM\OneToOne(targetEntity="Chmod")
     * @ORM\JoinColumn(name="chmod_id", referencedColumnName="id")
     */
    private $chmod;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Paper
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Paper
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set chmod
     *
     * @param \RomaChe\NewsBundle\Entity\Chmod $chmod
     *
     * @return Paper
     */
    public function setChmod(\RomaChe\NewsBundle\Entity\Chmod $chmod = null)
    {
        $this->chmod = $chmod;

        return $this;
    }

    /**
     * Get chmod
     *
     * @return \RomaChe\NewsBundle\Entity\Chmod
     */
    public function getChmod()
    {
        return $this->chmod;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return Paper
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }
}
